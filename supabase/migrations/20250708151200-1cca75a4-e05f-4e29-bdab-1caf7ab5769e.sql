-- Enable Row Level Security on properties table
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policy for landlords to view their own properties
CREATE POLICY "Landlords can view their own properties" 
ON public.properties 
FOR SELECT 
USING (landlord_id = auth.uid());

-- Create policy for landlords to insert their own properties
CREATE POLICY "Landlords can create their own properties" 
ON public.properties 
FOR INSERT 
WITH CHECK (landlord_id = auth.uid());

-- Create policy for landlords to update their own properties
CREATE POLICY "Landlords can update their own properties" 
ON public.properties 
FOR UPDATE 
USING (landlord_id = auth.uid());

-- Create policy for landlords to delete their own properties
CREATE POLICY "Landlords can delete their own properties" 
ON public.properties 
FOR DELETE 
USING (landlord_id = auth.uid());