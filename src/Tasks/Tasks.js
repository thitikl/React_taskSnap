export default function Tasks(props){
    const renderTasks = () => {
        return props.data.slice(0,5).map((task) => {
            return <div>
                <h3>{task.title}</h3>
                <p>{task.assigned_to}</p>
                <p>{task.due}</p>
            </div>
        })
    };
            
    return<div className="content">
        <h1>Tasks</h1>
        {renderTasks()}
    </div>
}