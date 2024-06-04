// 'use client';
// import { useState } from 'react';
// import { PiXBold } from 'react-icons/pi';
// import { Controller, SubmitHandler } from 'react-hook-form';
// import { Form } from '@/components/ui/form';
// import { Input, Button, ActionIcon, Title, Select, Textarea } from 'rizzui';
// import { useModal } from '@/app/shared/modal-views/use-modal';
// import { createProduct, getProducts } from '@/store/slices/productSlices';
// import { CreateProductInput, createProductSchema } from '@/utils/validators/create-product.schema';
// import { dispatch } from '@/store';
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/types';

// export default function CreateProduct() {
//   const { closeModal } = useModal();
//   const [reset, setReset] = useState({});
//   const [errors, setErrors] = useState<any>({});
//   const { pageSize, page, query, isCreateLoading } = useSelector((state: RootState) => state.product);
// //   const { listPositions } = useSelector((state: RootState) => state.position);
//   const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
//     const result: any = await dispatch(createProduct(data));

//     if (createProduct.fulfilled.match(result)) {
//       setReset({
//         name: '',
//         cost_price: '',
//         selling_price: '',
//         quantity: '',
        
//       });
//       setErrors({});
//       closeModal();
//       await dispatch(getProducts({ page, pageSize, query }));
//       toast.success('Product created successfully');
//     } else {
//       setErrors(result?.payload?.errors);
//     }
//   };
//   return (
//     <Form<CreateProductInput>
//       resetValues={reset}
//       onSubmit={onSubmit}
//       validationSchema={createProductSchema}
//       serverError={errors}
//       className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
//     >
//       {({ setError, register, control, watch, formState: { errors } }) => {
//         console.log('errors', errors);
//         return (
//           <>
//             <div className="col-span-full flex items-center justify-between">
//               <Title as="h4" className="font-semibold">
//                 Add a new Product
//               </Title>
//               <ActionIcon size="sm" variant="text" onClick={closeModal}>
//                 <PiXBold className="h-auto w-5" />
//               </ActionIcon>
//             </div>
//             <Input
//               label="Product Name"
//               placeholder="Enter product name"
//               className="col-span-full"
//               {...register('name')}
//               error={errors.name?.message}
//             />
//             <Input
//               label="Cost Price"
//               placeholder="Enter cost price"
//               {...register('cost_price')}
//               className="col-span-full"
//               error={errors.cost_price?.message}
//             />

//             <Input
//               label="Selling Price"
//               placeholder="Enter selling price"
//               {...register('selling_price')}
//               className="col-span-full"
//               error={errors.selling_price?.message}
//             />

            
            

//             <div className="col-span-full flex items-center justify-end gap-4">
//               <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
//                 Cancel
//               </Button>
//               <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
//                 Create Product
//               </Button>
//             </div>
//           </>
//         );
//       }}
//     </Form>
//   );
// }
'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { createProduct, getProducts } from '@/store/slices/productSlices';
import { CreateProductInput, createProductSchema } from '@/utils/validators/create-product.schema';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';


export default function CreateStaff() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, isCreateLoading} = useSelector((state: RootState) => state.product);
  // const { listPositions } = useSelector((state: RootState) => state.position);
  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
    const result: any = await dispatch(createProduct(data));

    if (createProduct.fulfilled.match(result)) {
      setReset({
        name: '',
        cost_price: '',
        selling_price: '',
        quantity: '',
      
      });
      setErrors({});
      closeModal();
      await dispatch(getProducts ({ page, pageSize, query }));
      toast.success('Product created successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
    console.log(data);
  };
  return (
    <Form<CreateProductInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createProductSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new Product
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Product Name"
              placeholder="Enter product name"
              className="col-span-full"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label="Cost Price"
              placeholder="Enter cost price"
              {...register('cost_price')}
              className="col-span-full"
              error={errors.cost_price?.message}
            />

            <Input
              label="Selling Price"
              placeholder="Enter selling price"
              {...register('selling_price')}
              className="col-span-full"
              error={errors.selling_price?.message}
            />

            
            

            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                Create Product
             </Button>
             </div>
             </>
        );
      }}
      
    </Form>
  );
}
