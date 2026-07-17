-- LYNX Boutique: fotos opcionales para reseñas moderadas.
-- Ejecutar una vez en Supabase > SQL Editor, después de customer_reviews.sql.

alter table public.customer_reviews
  add column if not exists images text[] not null default '{}'::text[];

create or replace function public.submit_customer_review(
  p_rating smallint,
  p_comment text,
  p_images text[] default '{}'::text[]
)
returns public.customer_reviews
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text;
  v_verified boolean;
  v_review public.customer_reviews;
  v_image text;
  v_images text[] := coalesce(p_images, '{}'::text[]);
begin
  if auth.uid() is null then
    raise exception 'Inicia sesión para enviar una reseña';
  end if;

  select full_name, email_verified
  into v_name, v_verified
  from public.customer_profiles
  where user_id = auth.uid();

  if v_name is null or not coalesce(v_verified, false) then
    raise exception 'Debes tener un correo verificado para enviar una reseña';
  end if;
  if p_rating is null or p_rating not between 1 and 5 then
    raise exception 'La calificación debe estar entre 1 y 5 estrellas';
  end if;
  if char_length(trim(coalesce(p_comment, ''))) not between 10 and 600 then
    raise exception 'La reseña debe tener entre 10 y 600 caracteres';
  end if;
  if cardinality(v_images) > 3 then
    raise exception 'Puedes adjuntar un máximo de 3 fotos';
  end if;

  foreach v_image in array v_images loop
    if v_image is null or v_image !~ ('^' || auth.uid()::text || '/') then
      raise exception 'Una foto no pertenece a tu cuenta';
    end if;
  end loop;

  insert into public.customer_reviews (user_id, author_name, rating, comment, images, status)
  values (auth.uid(), trim(v_name), p_rating, trim(p_comment), v_images, 'pending')
  on conflict (user_id) do update set
    author_name = excluded.author_name,
    rating = excluded.rating,
    comment = excluded.comment,
    images = excluded.images,
    status = 'pending',
    updated_at = now()
  returning * into v_review;

  return v_review;
end;
$$;

revoke all on function public.submit_customer_review(smallint, text, text[]) from public;
grant execute on function public.submit_customer_review(smallint, text, text[]) to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('review-images', 'review-images', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

drop policy if exists "Customers can upload their own review images" on storage.objects;
create policy "Customers can upload their own review images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'review-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Public can view published review images" on storage.objects;
create policy "Public can view published review images"
on storage.objects for select
to anon, authenticated
using (
  bucket_id = 'review-images'
  and exists (
    select 1
    from public.customer_reviews as review
    where review.status = 'published'
      and storage.objects.name = any(review.images)
  )
);

drop policy if exists "Owners and admins can delete review images" on storage.objects;
create policy "Owners and admins can delete review images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'review-images'
  and (
    (storage.foldername(name))[1] = auth.uid()::text
    or public.is_admin()
  )
);
