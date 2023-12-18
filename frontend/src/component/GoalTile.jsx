import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { FaRegTrashCan } from "react-icons/fa6";

export default function GoalTile({ goal }) {
  const dispatch = useDispatch();

  return (
    <>
      <li className="my-2 bg-teal-50 relative p-1">
        <p className="text-2xl">{goal.text}</p>
        <small className="text-base">
          Last update:{" "}
          {new Date(goal.updatedAt).toLocaleString("en-US", "short")}
        </small>
        <button
          className="absolute right-0 top-1"
          title="Delete goal"
          aria-label={`Delete goal ${goal.text}`}
          onClick={() => dispatch(deleteGoal(goal._id))}
        >
          <FaRegTrashCan />
        </button>
      </li>
    </>
  );
}
