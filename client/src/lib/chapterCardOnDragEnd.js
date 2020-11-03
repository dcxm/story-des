const makeUpdateOnChapterIdsAndColumns = (destination, source, draggableId, data) => {
    if (!destination || destination.index === source.index) return null;
    if (destination.droppableId === source.droppableId
        && destination.index === source.index) { return; }
    const column = data.columns["col-1"];
    const newIds = Array.from(column.chapterIds);
    newIds.splice(source.index, 1);
    newIds.splice(destination.index, 0, column.chapterIds[column.chapterIds.findIndex(e => e.dataValues.id.toString() === draggableId)]);
    newIds.map((item, index) => {
        item.dataValues.order = index + 1
    });
    return {
        newIds,
        column
    }
}

const updateInDatabase = (destination, source, newIds) => {
    let updateThis;
    if (source.index < destination.index) {
        updateThis = newIds.slice(source.index, destination.index + 1)
    } else {
        updateThis = newIds.slice(destination.index, source.index + 1);
    }
    window.ipcRenderer.send("database:update-chapter", updateThis)
    window.ipcRenderer.once("database:update-chapter", () => {
        return 
    })
}

const makeNewChapterObjects = (newIds, column, chapterObject) => {
    const newCol = {
        ...column,
        chapterIds: newIds
    }
    const newData = {
        chapters: newIds,
        columns: {
            ...chapterObject.columns,
            "col-1": newCol
        }
    }
    return {
        newCol, 
        newData
    }
}

const chapterCardOnDragEnd = (provided, chapterObject, setData, setItems) => {
    if (chapterObject.chapters.length > 1) {
        console.log("Doin")
        const { destination, source, draggableId } = provided;
    
        const updatedChapters = makeUpdateOnChapterIdsAndColumns(destination, source, draggableId, chapterObject);
        if (updatedChapters !== null) {
            const { newIds, column } = updatedChapters;
            
            const newData = makeNewChapterObjects(newIds, column, chapterObject).newData;
            setData(newData);
            updateInDatabase(destination, source, newIds);
        } else return;
    }   else return;
}

export default chapterCardOnDragEnd