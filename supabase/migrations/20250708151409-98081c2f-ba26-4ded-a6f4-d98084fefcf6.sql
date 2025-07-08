-- First, let's drop the existing RLS policies that are causing issues
DROP POLICY IF EXISTS "Landlords can view their own properties" ON public.properties;
DROP POLICY IF EXISTS "Landlords can create their own properties" ON public.properties;
DROP POLICY IF EXISTS "Landlords can update their own properties" ON public.properties;
DROP POLICY IF EXISTS "Landlords can delete their own properties" ON public.properties;

-- Create new policies that work directly with auth.uid() instead of the landlords table
CREATE POLICY "Users can view their own properties" 
ON public.properties 
FOR SELECT 
USING (landlord_id = auth.uid());

CREATE POLICY "Users can create their own properties" 
ON public.properties 
FOR INSERT 
WITH CHECK (landlord_id = auth.uid());

CREATE POLICY "Users can update their own properties" 
ON public.properties 
FOR UPDATE 
USING (landlord_id = auth.uid());

CREATE POLICY "Users can delete their own properties" 
ON public.properties 
FOR DELETE 
USING (landlord_id = auth.uid());