const TableRevenueEx = () => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th rowSpan={2} scope="col" className="px-6 py-3 text-center text-nowrap">
              #
            </th>
            <th rowSpan={2} scope="col" className="px-6 py-3 text-center text-nowrap">
              Date time
            </th>
            <th rowSpan={2} scope="col" className="px-6 py-3 text-center text-nowrap">
              Staff
            </th>
            <th colSpan={3} scope="col" className="px-6 py-3 text-center text-nowrap">
              Revenue and expenditure
            </th>
          </tr>
          <tr>
            <th rowSpan={2} scope="col" className="px-6 py-3 text-center text-nowrap text-red-400">
              Revenue
            </th>
            <th rowSpan={2} scope="col" className="px-6 py-3 text-center text-nowrap text-green-400">
              Expenditure
            </th>
            <th rowSpan={2} scope="col" className="px-6 py-3 text-center text-nowrap text-slate-500">
              Remaining
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 text-center"></td>
            <td className="px-6 py-4 text-center"></td>
            <td className="px-6 py-4 text-center text-red-400">Beginning balance</td>
            <td className="px-6 py-4 text-center"></td>
            <td className="px-6 py-4 text-center"></td>
            <td className="px-6 py-4 text-center text-red-400">$500</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="text-center">
              1
            </th>
            <td className="px-6 py-4 text-center">01/10/2023</td>
            <td className="px-6 py-4 text-center">Nguyễn Văn A</td>
            <td className="px-6 py-4 text-center text-purple-400">$2999</td>
            <td className="px-6 py-4 text-center text-red-400">$0</td>
            <td className="px-6 py-4 text-center text-blue-400">$2999</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="text-center">
              2
            </th>
            <td className="px-6 py-4 text-center">01/10/2023</td>
            <td className="px-6 py-4 text-center">Nguyễn Văn B</td>
            <td className="px-6 py-4 text-center text-purple-400">$2999</td>
            <td className="px-6 py-4 text-center text-red-400">$1000</td>
            <td className="px-6 py-4 text-center text-blue-400">$1000</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="text-center">
              3
            </th>
            <td className="px-6 py-4 text-center">01/10/2023</td>
            <td className="px-6 py-4 text-center">Nguyễn Văn B</td>
            <td className="px-6 py-4 text-center text-purple-400">$2999</td>
            <td className="px-6 py-4 text-center text-red-400">$1000</td>
            <td className="px-6 py-4 text-center text-blue-400">$1000</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 text-center"></td>
            <td className="px-6 py-4 text-center"></td>
            <td className="px-6 py-4 text-center text-green-400 text-bold">Total balance</td>
            <td className="px-6 py-4 text-center">$1000</td>
            <td className="px-6 py-4 text-center">$1000</td>
            <td className="px-6 py-4 text-center text-red-400">$500</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 text-center"></td>
            <td className="px-6 py-4 text-center"></td>
            <td className="px-6 py-4 text-center text-green-400 text-bold">Endding balance</td>
            <td className="px-6 py-4 text-center"></td>
            <td className="px-6 py-4 text-center"></td>
            <td className="px-6 py-4 text-center text-green-400">$500</td>
          </tr>
        </tbody>
      </table>
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
