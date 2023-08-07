export default function Board(props){
    const renderTasks = () => {
        return props.data.slice(5,10).map((task) => {
            return <div>
                <h3>{task.title}</h3>
                <p>{task.assigned_to}</p>
                <p>{task.due}</p>
            </div>
        })
    };
            
    return<div className="content">
        <h1>Board</h1>
        {renderTasks()}
    </div>
}