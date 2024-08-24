'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';

export default function Register() {
	function extractTextSummary(htmlString) {
		// 创建一个临时的DOM元素来解析HTML
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = htmlString;

		// 使用DOM方法提取文本
		const textContent = tempDiv.textContent || tempDiv.innerText;

		// 截取前128个字符作为摘要
		const summary = textContent.trim().substring(0, 128);

		// 处理连续的空格，并在摘要末尾添加省略号
		return summary.replace(/\s+/g, ' ').trim() + (summary.length >= 128 ? '...' : '');
	}
    const htmlString = '<div><h1>标题</h1><p>这里是一些示例文本。它是一个HTML字符串，我们将从中提取文本摘要。</p></div>';
	const textSummary = extractTextSummary(htmlString);
    return (
		<div>
			{textSummary}
		</div>
	);
}
