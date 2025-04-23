function AssignmentForm({ onAssignmentAdded, editing, cancelEdit }) {
    const [form, setForm] = useState(editing || {
      courseName: '',
      title: '',
      dueDate: '',
      reminderOffset: 24,
    });
  
    useEffect(() => {
      if (editing) setForm(editing);
    }, [editing]);
  
    const handleSubmit = async e => {
      e.preventDefault();
      if (editing) {
        await API.put(`/assignments/${editing._id}`, form);
        cancelEdit();
      } else {
        await API.post('/assignments', form);
      }
      onAssignmentAdded();
      setForm({ courseName: '', title: '', dueDate: '', reminderOffset: 24 });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input name="courseName" value={form.courseName} onChange={handleChange} />
        <input name="title" value={form.title} onChange={handleChange} />
        <input name="dueDate" type="datetime-local" value={form.dueDate} onChange={handleChange} />
        <input name="reminderOffset" type="number" value={form.reminderOffset} onChange={handleChange} />
        <button type="submit">{editing ? 'Update' : 'Add'} Assignment</button>
        {editing && <button onClick={cancelEdit}>Cancel</button>}
      </form>
    );
  }
  