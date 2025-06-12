import { categoryColors, categoryIcons } from "../lib/constants/categoryIcons";
import { HiOutlineCalendar } from "react-icons/hi";
import { formatAmount } from "../lib/formatAmount";
function IncomeItem({ id, category, date, amount }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`p-3 rounded-xl ${
              categoryColors[category] || categoryColors.Miscellaneous
            }`}
          >
            {categoryIcons[category] || categoryIcons.Miscellaneous}
          </div>
          <div>
            <h3 className="font-medium">{category}</h3>
            <div className="flex items-center text-sm text-gray-400 mt-1">
              <HiOutlineCalendar className="mr-1" />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <span className="text-lg font-medium text-emerald-400">
          + ₹{formatAmount(amount)}
        </span>
      </div>
    </div>
  );
}

export default IncomeItem;
