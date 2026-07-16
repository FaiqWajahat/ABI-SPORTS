import FAQ from '@/components/home/FAQ';
import MapSection from '@/components/home/MapSection';
import Offices from '@/components/home/Offices';
import TimeSection from '@/components/home/TimeSection';
import QuoteForm from '@/components/inquiry/QuoteForm';

export const metadata = {
  title: 'Request a Quote | ABI SPORTS — B2B Sportswear Manufacturing',
  description:
    'Get a custom manufacturing quote from ABI Sports Sialkot. Tell us your product requirements, quantities, and timeline — our B2B sales team responds within 12 business hours.',
};

export default function InquiryPage() {
  return(
  <>
  <QuoteForm />
  <Offices />
  <MapSection />
  <TimeSection/>
 <FAQ/>
  </>
  
  
  );
}
