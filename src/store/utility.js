export const updateObject = (oldObject, changedValue) => {
    return {
        ...oldObject,
        ...changedValue
    }
}