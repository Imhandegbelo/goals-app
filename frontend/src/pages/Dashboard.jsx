import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGoals, reset } from "../features/goals/goalSlice";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../component/GoalForm";
import GoalTile from "../component/GoalTile";
import Spinner from "../component/Spinner";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(()=>{
    if (user){
      dispatch(reset())
    }
  },[user,dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getGoals());

  }, [user, navigate, isError, message, dispatch]);

  return (
    <div className="p-6 md:p-10 lg:px-14 xl:px-20">
      <section className="text-center">
        <h1 className="font-bold text-3xl tracking-[2px] md:text-4xl lg:text-5xl">
          Welcome <span className="text-teal-500">{user && user.name}</span>
        </h1>
        <p className="text-neutral-500 text-3xl">Goal dashboard</p>
      </section>
      <section>
        <GoalForm />
      </section>

      <section className="relative">
        {isLoading ? (
          <Spinner />
        ) : goals.length > 1 ? (
          <ul className="mx-auto md:w-2/5">
            {goals.map((goal) => (
              <GoalTile goal={goal} key={goal._id} />
            ))}
          </ul>
        ) : (
          <h3 className="text-center text-neutral-500 text-3xl">
            You have no goals yet
          </h3>
        )}
      </section>
    </div>
  );
}
