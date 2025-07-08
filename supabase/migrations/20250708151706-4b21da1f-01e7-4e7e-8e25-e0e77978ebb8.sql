-- Fix the foreign key constraint issue
-- Remove the foreign key constraint from properties table
ALTER TABLE public.properties DROP CONSTRAINT IF EXISTS properties_landlord_id_fkey;

-- The landlord_id will now directly store auth.uid() without needing a landlords table reference