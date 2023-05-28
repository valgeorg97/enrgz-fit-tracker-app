// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from "../context/AuthContext"; 
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import Workouts from "../views/Workouts/Workouts";
// import {Select} from "@chakra-ui/react" 

// const Calendar = () => {
//     const { workouts, setWorkouts, selectedWorkout, setSelectedWorkout } = useContext(AuthContext);
//     const [events, setEvents] = useState([
//         { title: 'event 1', date: '2023-06-01' },
//         { title: 'event 2', date: '2023-06-02' }
//     ]);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const workoutOptions = workouts.map(workout => ({ value: workout.name, label: workout.name }));

//     useEffect(() => {
//         if (selectedWorkout && selectedDate) {
//             setEvents([...events, { title: selectedWorkout.name, date: selectedDate }]);
//             setSelectedDate(null);
//             setSelectedWorkout(null);
//         }
//     }, [selectedWorkout, selectedDate]);

//     const handleDateClick = (arg) => {
//         setSelectedDate(arg.dateStr);
//         setShowDropdown(true);
//     };

//     const handleWorkoutSelect = (selectedOption) => {
//         setSelectedWorkout(selectedOption.value);
//         setShowDropdown(false);
//     };

//     return (
//         <div>
//             <button onClick={() => setShowDropdown(!showDropdown)}>
//                 Add a workout
//             </button>
//             {showDropdown &&
//                 <Select
//                     options={workoutOptions}
//                     onChange={handleWorkoutSelect}
//                 />
//             }
//             {workouts.length > 0 &&
//                 <Workouts workouts={workouts} setSelectedWorkout={setSelectedWorkout} />
//             }
//             <FullCalendar
//                 plugins={[ dayGridPlugin ]}
//                 initialView="dayGridMonth"
//                 events={events}
//                 dateClick={handleDateClick}
//             />
//         </div>
//     );
// }

// export default Calendar;
