interface TotalProps {
    totalExercises: number
}

function Total({totalExercises}: TotalProps) {
    return (
        <>
            <p>Number of exercises {totalExercises}</p>
        </>
    );
}

export default Total;
