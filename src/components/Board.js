import moment from "moment";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Board(props) {
    var data = props.data;
    var statuses = [
        { id: 0, value: "Plan" },
        { id: 1, value: "Ongoing" },
        { id: 2, value: "Finished" },
    ];
    var renderTasks = (tasks, status) => {
        return (
            <div className="board-status">
                <h1>{status.value}</h1>
                <hr />
                {tasks
                    .filter((task) => task.status == status.value.toLowerCase())
                    .map((task) => {
                        return (
                            <div className="board-task">
                                <h3 className="board-task-title">
                                    {task.title}
                                </h3>
                                <p>
                                    {task.dueDate != ""
                                        ? task.dueTime != ""
                                            ? "📅 " +
                                              moment(task.dueDate).format(
                                                  "MMM DD, YYYY "
                                              ) +
                                              moment(
                                                  task.dueTime,
                                                  "HH:mm:ss"
                                              ).format("h:mm A")
                                            : "📅 " +
                                              moment(task.dueDate).format(
                                                  "MMM DD, YYYY"
                                              )
                                        : ""}
                                </p>
                                <p>🏷️ {task.label}</p>
                            </div>
                        );
                    })}
            </div>
        );
    };

    // var onDragEnd = (result) => {
    //     if (!result.destination) return;
    //     var items = Array.from(data);
    //     var [reorderedItem] = items.splice(result.source.index, 1);
    //     items.splice(result.destination.index, 0, reorderedItem);
    //     props.modifyData(items);
    // };

    return (
        <div className="content" id="board">
            {/* <DragDropContext onDragEnd={onDragEnd}> */}
            {statuses.map((status) => {
                return renderTasks(data, status);
            })}
            {/* </DragDropContext> */}
        </div>
    );
}

export default Board;
