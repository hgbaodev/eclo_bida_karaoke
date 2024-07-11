import { RootState } from '@/store/types';
import { useSelector } from 'react-redux';
import { Loader } from 'rizzui';
import { useTranslations } from 'next-intl';

const TableRevenueEx = () => {
  const t = useTranslations('revenue-expenditure');
  const { revenueEx, isRevenueExLoading } = useSelector((state: RootState) => state.statistical);
  return (
    <div className="relative overflow-x-auto">
      {isRevenueExLoading ? (
        <div className="flex justify-center items-center">
          <Loader variant="spinner" size="lg" />
        </div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th rowSpan={2} scope="col" className="px-6 py-3 text-center text-nowrap">
                #
              </th>
              <th rowSpan={2} scope="col" className="px-6 py-3 text-center text-nowrap">
                {t('date_time')}
              </th>
              <th rowSpan={2} scope="col" className="px-6 py-3 text-center text-nowrap">
                {t('staff')}
              </th>
              <th colSpan={3} scope="col" className="px-6 py-3 text-center text-nowrap">
                {t('revenue_and_expenditure')}
              </th>
            </tr>
            <tr>
              <th rowSpan={2} scope="col" className="px-6 py-3 text-center text-nowrap text-red-400">
                {t('revenue')}
              </th>
              <th rowSpan={2} scope="col" className="px-6 py-3 text-center text-nowrap text-green-400">
                {t('expenditure')}
              </th>
              <th rowSpan={2} scope="col" className="px-6 py-3 text-center text-nowrap text-slate-500">
                {t('remaining')}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 text-center"></td>
              <td className="px-6 py-4 text-center"></td>
              <td className="px-6 py-4 text-center text-red-400">{t('beginning_balance')}</td>
              <td className="px-6 py-4 text-center"></td>
              <td className="px-6 py-4 text-center"></td>
              <td className="px-6 py-4 text-center text-red-400">{revenueEx?.beginTotal}</td>
            </tr>
            {revenueEx?.listRevenueEx?.map((item, index) => (
              <tr key={index + 1} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="text-center">
                  {index}
                </th>
                <td className="px-6 py-4 text-center">{item.time}</td>
                <td className="px-6 py-4 text-center">{item.customer}</td>
                <td className="px-6 py-4 text-center text-purple-400">{item.revenue}</td>
                <td className="px-6 py-4 text-center text-red-400">{item.expenditure}</td>
                <td className="px-6 py-4 text-center text-blue-400">{item.remaining}</td>
              </tr>
            ))}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 text-center"></td>
              <td className="px-6 py-4 text-center"></td>
              <td className="px-6 py-4 text-center text-green-400 text-bold">{t('total_balance')}</td>
              <td className="px-6 py-4 text-center">
                {revenueEx?.listRevenueEx.reduce((acc, item) => acc + item.revenue, 0)}
              </td>
              <td className="px-6 py-4 text-center">
                {revenueEx?.listRevenueEx.reduce((acc, item) => acc + item.expenditure, 0)}
              </td>
              <td className="px-6 py-4 text-center text-red-400">
                {revenueEx?.listRevenueEx.reduce((acc, item) => acc + item.remaining, revenueEx?.beginTotal ?? 0)}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 text-center"></td>
              <td className="px-6 py-4 text-center"></td>
              <td className="px-6 py-4 text-center text-green-400 text-bold">{t('ending_balance')}</td>
              <td className="px-6 py-4 text-center"></td>
              <td className="px-6 py-4 text-center"></td>
              <td className="px-6 py-4 text-center text-green-400">
                {revenueEx?.listRevenueEx.reduce((acc, item) => acc + item.remaining, revenueEx?.beginTotal ?? 0)}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableRevenueEx;

export interface OrderDetail {
  active: string;
  quantity: number;
  image: string;
  name: string;
  selling_price: number;
  quantity_stock: number;
}
