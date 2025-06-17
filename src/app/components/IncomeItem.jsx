import { categoryColors, categoryIcons } from "../lib/constants/categoryIcons";
import { HiOutlineCalendar } from "react-icons/hi";
import { formatAmount } from "../lib/formatAmount";
import useIsMobile from "@/hooks/useIsMobile";
import { useEffect, useRef, useState } from "react";
import useLongPress from "@/hooks/useLongPress";
import { IncomeForm } from "./IncomeForm";
import { MdEdit, MdDelete } from "react-icons/md";
import DeleteIncomeForm from "./DeleteIncomeForm";
import { useUserDataStore } from "@/stores/useUserDataStore";
import { currencyMap } from "../lib/constants/currencies";
function IncomeItem({
  id,
  category,
  date,
  amount,
  isRecurring,
  notes,
  isOptimistic,
}) {
  const isMobile = useIsMobile();
  const menuRef = useRef();
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const { handlers: longPressHandlers } = useLongPress({
    duration: isMobile ? 500 : 200,
    onLongPress: !isOptimistic ? enableOptionsMenu : "",
  });

  const [showEditIncomeForm, setShowEditIncomeForm] = useState(false);
  const [showDeleteIncomeForm, setShowDeleteIncomeForm] = useState(false);
  const currencyCode = useUserDataStore((state) => state.user.currencyCode);
  const currencySymbol = currencyMap[currencyCode]?.symbol;
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowOptionsMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showOptionsMenu]);
  function enableOptionsMenu(event) {
    if (
      event.target !== menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;

      setMenuPosition({ x: clientX, y: clientY });
      setShowOptionsMenu(true);
    }
  }
  function toggleEditIncomeForm() {
    setShowEditIncomeForm(!showEditIncomeForm);
  }
  function toggleDeleteIncomeForm() {
    setShowDeleteIncomeForm(!showDeleteIncomeForm);
  }

  return (
    <>
      <div
        {...longPressHandlers}
        className="no-select relative bg-gray-800 hover:bg-gray-700 rounded-xl p-4 transition-colors"
      >
        {isRecurring && (
          <div className="absolute top-1 right-2">
            <div className="flex items-center text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full transition-colors">
              Recurring
            </div>
          </div>
        )}
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
            + {currencySymbol + formatAmount(amount)}
          </span>
        </div>
        <div
          ref={menuRef}
          style={{
            left: menuPosition.x,
            top: menuPosition.y,
          }}
          className={`fixed bg-gray-800 border border-gray-700 shadow-lg rounded-lg p-1 flex flex-col z-50 ${
            showOptionsMenu ? "animate-slideDown" : "hidden"
          }`}
        >
          <button
            onClick={toggleEditIncomeForm}
            className="flex items-center w-full px-4 py-2.5 text-left text-sm text-gray-200 hover:bg-gray-700 rounded-md transition-all duration-150"
          >
            <MdEdit className="mr-2 text-gray-400" size={20} />
            <span>Edit</span>
          </button>

          <button
            onClick={toggleDeleteIncomeForm}
            className="flex items-center w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-gray-700 rounded-md transition-all duration-150"
          >
            <MdDelete className="mr-2" size={20} />
            <span>Delete</span>
          </button>
        </div>
      </div>
      {showEditIncomeForm && (
        <IncomeForm
          type="edit"
          onClose={toggleEditIncomeForm}
          id={id}
          category={category}
          date={date}
          amount={amount}
          isRecurring={isRecurring}
          notes={notes}
        />
      )}
      {showDeleteIncomeForm && (
        <DeleteIncomeForm incomeId={id} onClose={toggleDeleteIncomeForm} />
      )}
    </>
  );
}

export default IncomeItem;
