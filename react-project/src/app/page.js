'use client'
import { useState, useRef } from 'react';
import Link from 'next/link'
import { Button } from 'antd';

export default function Login () {
    return (
        <div>
            {/* <h1>Hello, World!</h1> */}
            <MyButton />

        </div>
    );
}


function MyButton () {
    return (
        <Button type="primary">
            <Link href="/home">home</Link>
        </Button>
    )

}