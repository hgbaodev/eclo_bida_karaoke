// 'use client';
// import { useState } from 'react';
// import { PiXBold } from 'react-icons/pi';
// import { Controller, SubmitHandler } from 'react-hook-form';
// import { Form } from '@/components/ui/form';
// import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
// import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
// import { updateProduct, getProductImports } from '@/store/slices/product_import_detailSlice';
// import { dispatch } from '@/store';
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/types';
// import {
//   EditProduct_Import_DetailtInput,
//   editProduct_Import_DetailSchema,
// } from '@/utils/validators/product/edit-product_import_detail.schema';

// import { statusOptions } from './type';
// import { useTranslations } from 'next-intl';
// export default function EditProductImportDetail({
//   product_import_detail,
//   active,
// }: {
//   product_import_detail: EditProduct_Import_DetailtInput;
//   active: string;
// }) {
//   const { closeModal } = useModal();
//   const [reset, setReset] = useState<any>(product_import_detail);
//   const [errors, setErrors] = useState<any>({});
//   const { pageSize, page, query, isUpdateLoading } = useSelector((state: RootState) => state.product_import_detail);
//   const t = useTranslations('product_import');
//   const onSubmit: SubmitHandler<EditProduct_Import_DetailtInput> = async (data) => {
//     const result: any = await dispatch(updateProduct({ product_import_detail: data, active }));

//     if (updateProduct.fulfilled.match(result)) {
//       setReset({
//         cost_price:'',
//         quantity:''
//       });
//       setErrors({});
//       closeModal();
//       await dispatch(getProductImports({ page, pageSize, query }));
//       toast.success('Import updated successfully');
//     } else {
//       setErrors(result?.payload?.errors);
//     }
//   };
//   return (
//     <Form<EditProduct_Import_DetailtInput>
//       resetValues={reset}
//       onSubmit={onSubmit}
//       validationSchema={editProduct_Import_DetailSchema}
//       serverError={errors}
//       className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
//     >
//       {({ setError, register, control, watch, formState: { errors } }) => {
//         return (
//           <>
//             <div className="col-span-full flex items-center justify-between">
//               <Title as="h4" className="font-semibold">
//                 {t('edit_import')}
//               </Title>
//               <ActionIcon size="sm" variant="text" onClick={closeModal}>
//                 <PiXBold className="h-auto w-5" />
//               </ActionIcon>
//             </div>
//             <Input
//               label={t('import_day')}
    
//               className="col-span-full"
//               {...register('import')}
//               error={errors.import?.message}
//             />
//              <Input
//               label={t('product_name')}
            
//               className="col-span-full"
//               {...register('product')}
//               error={errors.product?.message}
//             />
//             <Input
//               label={t('quantity')}
            
//               {...register('quantity')}
//               className="col-span-full"
//               error={errors.quantity?.message}
//             />
//             <Input
//               label={t('cost_price')}
          
//               className="col-span-full"
//               {...register('cost_price')}
//               error={errors.cost_price?.message}
//             />
//             <div className="col-span-full flex items-center justify-end gap-4">
//               <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
//                 {t('cancel')}
//               </Button>
//               <Button type="submit" isLoading={isUpdateLoading} className="w-full @xl:w-auto">
//                 {t('btn_edit')}
//               </Button>
//             </div>
//           </>
//         );
//       }}
//     </Form>
//   );
// }
