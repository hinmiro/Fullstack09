import {CoursePart, ContentProps} from "../model/coursePart.ts";
import Part from "./Part.tsx";

const Content = ({courseParts}: ContentProps) => {

    return (
        <>
            {courseParts.map((part: CoursePart, i: number) => (
                <Part key={i} part={part}/>
            ))}
        </>
    );
};

export default Content;
