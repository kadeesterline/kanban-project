import React from 'react'

function UpdateListForm({ updateListFormState, setUpdateListFormState, handleUpdateList}) {


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdateListFormState((formState) => ({ ...formState, [name]: value }));
      };


    function handleSubmit(event){
        event.preventDefault()
        handleUpdateList()
    }

    return (
    <div>
    <form onSubmit={handleSubmit}>
        <label>name</label>
        <input
        type="text"
        placeholder="enter new name"
        name="name"
        value={updateListFormState.name}
        onChange={handleChange}
        />
    </form>
</div>
  )
}

export default UpdateListForm