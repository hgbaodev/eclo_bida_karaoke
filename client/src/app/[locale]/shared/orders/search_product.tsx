'use client';

import AvatarCard from '@/components/ui/avatar-card';
import env from '@/env';
import React, { useEffect, useRef, useState } from 'react';
import { ActionIcon, Button, Input, Loader, Popover } from 'rizzui';
import { IoMdAdd } from 'react-icons/io';
import { RiFinderFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { getProducts, setAddProduct, setProducts, setQueryProduct } from '@/store/slices/orderSlice';
import { dispatch } from '@/store';
import useDebounce from '@/hooks/use-debounce';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { MdOutlineFindInPage } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

const SearchProduct = () => {
  const t = useTranslations('order');
  const { queryProduct, isLoadingQueryProduct, products } = useSelector((state: RootState) => state.order);
  const searchProduct = useDebounce(queryProduct, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchProduct) {
      dispatch(getProducts(searchProduct));
    } else {
      dispatch(setProducts([]));
    }
  }, [searchProduct]);

  return (
    <Popover showArrow={false}>
      <Popover.Trigger>
        <Input
          ref={inputRef}
          value={queryProduct}
          onChange={(event) => dispatch(setQueryProduct(event.target.value))}
          placeholder={t('search_products')}
          prefix={<PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />}
          suffix={
            queryProduct && (
              <Button
                size="sm"
                variant="text"
                className="h-auto w-auto px-0"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setQueryProduct(''));
                }}
              >
                Clear
              </Button>
            )
          }
        />
      </Popover.Trigger>
      <Popover.Content>
        {({ setOpen }) => (
          <div className="w-[550px] mt-2">
            <div className="flex flex-col justify-center space-y-2">
              {isLoadingQueryProduct ? (
                <div className="flex justify-center items-center">
                  <Loader variant="threeDot" size="xl" color="info" />
                </div>
              ) : queryProduct.length == 0 ? (
                <div className="h-100px flex flex-col items-center justify-center">
                  <MdOutlineFindInPage className="w-10 h-10" />
                  <span className="text-gray-400 mt-2">{t('please_enter_product_name')}</span>
                </div>
              ) : products.length == 0 ? (
                <div className="h-100px flex flex-col items-center justify-center">
                  <RiFinderFill className="w-10 h-10" />
                  <span className="text-gray-400">{t('no_product_found')}</span>
                </div>
              ) : (
                <>
                  {products.map(
                    (product: {
                      active: string;
                      image: string;
                      name: string;
                      selling_price: number;
                      quantity: number;
                    }) => (
                      <div
                        key={product?.active}
                        className="flex justify-between items-center space-x-2 cursor-pointer rounded"
                      >
                        <AvatarCard
                          src={env.API_STORAGE + product.image}
                          avatarProps={{
                            name: '',
                            size: 'lg',
                            className: 'rounded-lg',
                          }}
                          name={product.name + ` (${product.quantity})`}
                        />
                        <ActionIcon
                          onClick={() => {
                            if (product.quantity == 0) {
                              toast.error(t('out_of_stock'));
                              return;
                            }
                            const pro = {
                              active: product.active,
                              name: product.name,
                              image: product.image,
                              selling_price: product.selling_price,
                              quantity: 1,
                              quantity_stock: product.quantity,
                            };
                            dispatch(setAddProduct(pro));
                            setOpen(false);
                            dispatch(setQueryProduct(''));
                          }}
                          as="span"
                          size="sm"
                          variant="outline"
                          className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
                        >
                          <IoMdAdd className="h-4 w-4" />
                        </ActionIcon>
                      </div>
                    ),
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
};

export default SearchProduct;
