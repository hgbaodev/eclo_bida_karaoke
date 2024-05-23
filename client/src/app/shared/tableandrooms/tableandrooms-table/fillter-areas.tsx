import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input } from 'rizzui';

const FillterAreas = () => {
  <Input
    type="search"
    placeholder="Search areas..."
    value={''}
    prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
    rounded="lg"
    clearable
    className="-order-2 w-full @xl:-order-5 @xl:ms-auto @xl:w-auto @4xl:-order-2 @4xl:w-[230px] @5xl:w-auto"
  />;
};

export default FillterAreas;
