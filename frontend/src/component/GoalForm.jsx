import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createGoal } from "../features/goals/goalSlice";

export default function GoalForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const submitGoal = (e) => {
    e.preventDefault();
    if (text.length < 3) {
      toast.error("Write a meaningful goal");
      return;
    }
    try {
      dispatch(createGoal({ text }));
      toast.success("Goal added successfully");
      setText("");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <form action="" onSubmit={submitGoal} className="mx-auto max-w-md">
        <div className="py-2">
          <input
            title="add goal"
            aria-label="type goal"
            type="text"
            name="text"
            value={text}
            placeholder="Add goal"
            onChange={(e) => setText(e.target.value)}
            className="text-xl md:text-2xl p-4 w-full border-2 border-transparentt hover:border-teal-500 focus:outline-none focus:border-teal-500 rounded-md"
          />
        </div>
        <div className="py-2 flex justify-center">
          <button
            aria-label="submit goal"
            title="submit"
            type="submit"
            className="bg-teal-500 text-white rounded-md text-xl py-4 px-6 font-semibold w-full hover:w-[96%]"
          >
            Add Goal
          </button>
        </div>
      </form>
    </div>
  );
}
