'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReactQuill from 'react-quill';
export default function BlogPostViewer({ blog }) {
	const modules = {
		toolbar: false, // 设置为 false 以移除工具栏
	};
	return (
		<>
			{blog.build_type == 'RT' ? (
				<ReactQuill
					theme="snow"
					value={blog.content}
					readOnly={true}
					modules={modules}
					className="myEditor"
				/>
			) : (
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
			)}
		</>
	);
}
