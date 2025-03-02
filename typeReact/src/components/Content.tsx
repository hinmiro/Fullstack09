interface ContentProps {
    courseParts: {
        name: string,
        exerciseCount: number
    }[]
}

const Content = (props: ContentProps) => {

    return (
        <>
            {props.courseParts.map(item => (
                <p>{item.name} {item.exerciseCount}</p>
            ))}
        </>
    );
};

export default Content;
