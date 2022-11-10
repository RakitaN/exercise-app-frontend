import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();

    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const workout = {title, load, reps}

        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            console.log("New workout added", json);
            dispatch({type: "CREATE_WORKOUT", payload: json});
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise title:</label>
            <input 
                type="text"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
             />
            
            <label>Load (kg):</label>
            <input 
                type="number"
                onChange={(event) => setLoad(event.target.value)}
                value={load}
             />

            <label>Reps:</label>
            <input 
                type="number"
                onChange={(event) => setReps(event.target.value)}
                value={reps}
             />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default WorkoutForm;