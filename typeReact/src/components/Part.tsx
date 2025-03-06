import {CoursePart} from "../model/coursePart.ts";


const Part = ({part}: { part: CoursePart }) => {

    const asserNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        )
    }

    return (
        <>
            <br/>
            {
                part.kind === "basic" ?
                    <div>
                        <h4>{part.name}</h4>
                        <i>desc: {part.description}</i>
                        <p>exercise count: {part.exerciseCount}</p>
                    </div> :
                    part.kind === "group" ?
                        <div>
                            <h4>{part.name}</h4>
                            <p>exercise count: {part.exerciseCount}</p>
                            <p>group project count: {part.groupProjectCount}</p>
                        </div> : part.kind === "background" ?
                            <div>
                                <h4>{part.name}</h4>
                                <i>desc: {part.description}</i>
                                <p>exercise count: {part.exerciseCount}</p>
                                <p>URL: {part.backgroundMaterial}</p>
                            </div> : part.kind === "special" ?
                                <div>
                                    <h4>{part.name}</h4>
                                    <p>exercise count: {part.exerciseCount}</p>
                                    <p>description: {part.description}</p>
                                    <p>requirements: [{part.requirements.join(", ")}]</p>
                                </div> : asserNever(part)
            }
        </>
    );
};

export default Part;
