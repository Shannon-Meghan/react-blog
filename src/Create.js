import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [author, setAuthor] = useState('Shannon');
	const [isPending, setIsPending] = useState('');
	const [history] = useHistory();

	const handleSubmit = e => {
		e.preventDefault();
		const blog = { title, body, author };

		setIsPending(true);

		fetch('http://localhost:8000/blogs', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(blog),
		}).then(() => {
			setIsPending(false);
			history.push('/');
		});
	};

	return (
		<div className="create">
			<h2>Add a New Blog</h2>
			<form onSubmit={handleSubmit}>
				<label>Blog Title</label>
				<input
					type="text"
					required
					value={title}
					onChange={e => setBody(e.target.value)}
				/>
				<label>Blog Body:</label>
				<input required value={body} onChange={e => setBody(e.target.value)} />
				<label>Blog Author</label>
				<select value={author} onChange={e => setAuthor(e.target.value)}>
					<option value="Shannon">Shannon</option>
					<option value="Satyam">Satyam</option>
					<option value="Charming">Charming</option>
				</select>
				{!isPending && <button>Add Blog</button>}
				{isPending && <button disabled>Adding Blog</button>}
			</form>
		</div>
	);
};

export default Create;
