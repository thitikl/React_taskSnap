export default function Calendar(props){
    const renderTasks = () => {
        return props.data.slice(10,15).map((task) => {
            return <div>
                <h3>{task.title}</h3>
                <p>{task.assigned_to}</p>
                <p>{task.due}</p>
            </div>
        })
    };
            
    return<div>
        <h1>Calendar</h1>
        {renderTasks()}
    </div>
}