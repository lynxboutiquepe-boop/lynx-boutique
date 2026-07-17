-- LYNX Boutique: reseñas reales de clientes con moderación.
-- Ejecutar una vez en Supabase > SQL Editor, después de schema.sql.

create table if not exists public.customer_reviews (
  id bigint generated always as identity primary key,
  user_id uuid not null unique references auth.users(id) on delete cascade,
  author_name text not null,
  rating smallint not null check (rating between 1 and 5),
  comment text not null check (char_length(trim(comment)) between 10 and 600),
  status text not null default 'pending' check (status in ('pending', 'published', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customer_reviews_public_idx on public.customer_reviews(status, created_at desc);

drop trigger if exists customer_reviews_set_updated_at on public.customer_reviews;
create trigger customer_reviews_set_updated_at
before update on public.customer_reviews
for each row execute function public.set_updated_at();

create or replace function public.submit_customer_review(
  p_rating smallint,
  p_comment text
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

  insert into public.customer_reviews (user_id, author_name, rating, comment, status)
  values (auth.uid(), trim(v_name), p_rating, trim(p_comment), 'pending')
  on conflict (user_id) do update set
    author_name = excluded.author_name,
    rating = excluded.rating,
    comment = excluded.comment,
    status = 'pending',
    updated_at = now()
  returning * into v_review;

  return v_review;
end;
$$;

revoke all on function public.submit_customer_review(smallint, text) from public;
grant execute on function public.submit_customer_review(smallint, text) to authenticated;

alter table public.customer_reviews enable row level security;

drop policy if exists "Public can read published reviews" on public.customer_reviews;
create policy "Public can read published reviews"
on public.customer_reviews for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Admin can manage reviews" on public.customer_reviews;
create policy "Admin can manage reviews"
on public.customer_reviews for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant select on public.customer_reviews to anon, authenticated;
grant update, delete on public.customer_reviews to authenticated;
