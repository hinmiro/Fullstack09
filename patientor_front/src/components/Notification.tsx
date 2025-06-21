interface Props {
    text: string;
}

const Notification = ({ text }: Props) => {
    return (
        <>
            <p style={{ color: 'red', fontSize: 20 }}>{text}</p>
        </>
    );
};

export default Notification;
