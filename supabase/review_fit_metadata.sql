alter table public.customer_reviews add column if not exists purchased_size text not null default '';
alter table public.customer_reviews add column if not exists height_cm integer;
alter table public.customer_reviews add column if not exists fit_feedback text not null default '';
alter table public.customer_reviews add column if not exists verified_purchase boolean not null default false;

create or replace function public.submit_customer_review_with_fit(
  p_rating smallint,
  p_comment text,
  p_images text[] default '{}'::text[],
  p_purchased_size text default '',
  p_height_cm integer default null,
  p_fit_feedback text default ''
)
returns public.customer_reviews
language plpgsql security definer set search_path=public
as $$
declare v_name text; v_email text; v_verified boolean; v_is_buyer boolean:=false; v_review public.customer_reviews; v_image text; v_images text[]:=coalesce(p_images,'{}'::text[]);
begin
  if auth.uid() is null then raise exception 'Inicia sesión para enviar una reseña'; end if;
  select full_name,email,email_verified into v_name,v_email,v_verified from public.customer_profiles where user_id=auth.uid();
  if v_name is null or not coalesce(v_verified,false) then raise exception 'Debes tener un correo verificado para enviar una reseña'; end if;
  if p_rating is null or p_rating not between 1 and 5 then raise exception 'La calificación debe estar entre 1 y 5 estrellas'; end if;
  if char_length(trim(coalesce(p_comment,''))) not between 10 and 600 then raise exception 'La reseña debe tener entre 10 y 600 caracteres'; end if;
  if cardinality(v_images)>3 then raise exception 'Puedes adjuntar un máximo de 3 fotos'; end if;
  if p_height_cm is not null and p_height_cm not between 120 and 230 then raise exception 'Revisa la estatura'; end if;
  if p_fit_feedback not in ('','ajustado','fiel','holgado') then raise exception 'Calce inválido'; end if;
  foreach v_image in array v_images loop if v_image is null or v_image !~ ('^'||auth.uid()::text||'/') then raise exception 'Una foto no pertenece a tu cuenta'; end if; end loop;
  select exists(select 1 from public.orders where status in ('confirmed','paid','shipped','completed') and (customer_user_id=auth.uid() or lower(customer_email)=lower(v_email))) into v_is_buyer;
  insert into public.customer_reviews(user_id,author_name,rating,comment,images,purchased_size,height_cm,fit_feedback,verified_purchase,status)
  values(auth.uid(),trim(v_name),p_rating,trim(p_comment),v_images,left(trim(coalesce(p_purchased_size,'')),20),p_height_cm,p_fit_feedback,v_is_buyer,'pending')
  on conflict(user_id) do update set author_name=excluded.author_name,rating=excluded.rating,comment=excluded.comment,images=excluded.images,purchased_size=excluded.purchased_size,height_cm=excluded.height_cm,fit_feedback=excluded.fit_feedback,verified_purchase=excluded.verified_purchase,status='pending',updated_at=now()
  returning * into v_review;
  return v_review;
end; $$;

revoke all on function public.submit_customer_review_with_fit(smallint,text,text[],text,integer,text) from public;
grant execute on function public.submit_customer_review_with_fit(smallint,text,text[],text,integer,text) to authenticated;
