//app/posts/edit/[id]/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import imageCompression from 'browser-image-compression'

const Edit = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [zipUrl, setZipUrl] = useState('')
  const [existingImage, setExistingImage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { id } = params

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Failed to fetch categories', error)
    }
  }

  const fetchPost = async (id: Number) => {
    try {
      const res = await axios.get(`/api/posts/${id}`)
      setTitle(res.data.title)
      setContent(res.data.content)
      setCategoryId(res.data.categoryId || '')
      setExistingImage(res.data.imageUrl || null)
      setZipUrl(res.data.zipUrl || '')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id))
      fetchCategories()
    }
  }, [id])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target
    const file = fileInput.files?.[0] || null
    if (file) {
      const fileName = file.name.toLowerCase()
      const allowedExtensions = ['.jpg', '.jpeg', '.webp', '.svg', '.png']
      const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext))

      if (!isValidExtension) {
        alert('Only files with extensions .jpg, .jpeg, .webp, .svg, .png are allowed')
        fileInput.value = ''
        return
      }

      try {
        const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1024, useWebWorker: true }
        const compressedFile = await imageCompression(file, options)

        const reader = new FileReader()
        reader.onloadend = () => setImagePreview(reader.result as string)
        reader.readAsDataURL(compressedFile)

        setImage(compressedFile)
      } catch (error) {
        console.error('Error compressing image', error)
      }
    } else {
      setImage(null)
      setImagePreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setError(null)
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('categoryId', categoryId)
      if (image) formData.append('image', image)
      formData.append('zipUrl', zipUrl.trim())

      await axios.put(`/api/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      router.push('/')
    } catch (error) {
      console.error(error)
      setError('บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง')
      setSubmitting(false)
    }
  }

  const previewSrc = imagePreview || existingImage

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/" className="field-hint hover:underline" style={{ marginTop: 0 }}>
          ← กลับหน้าหลัก
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-2">แก้ไขงานอาร์ตเวิร์ก</h1>
        <p className="field-hint" style={{ marginTop: '0.25rem' }}>
          ปรับรายละเอียดงาน รูปตัวอย่าง หรือลิงก์ดาวน์โหลด แล้วบันทึก
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="title" className="field-label">
              ชื่องาน<span className="field-required">*</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น โปสเตอร์รณรงค์งดเหล้าเข้าพรรษา"
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="category" className="field-label">
              หมวดหมู่
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="field-input"
            >
              <option value="">เลือกหมวดหมู่</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="content" className="field-label">
            รายละเอียด<span className="field-required">*</span>
          </label>
          <textarea
            name="content"
            id="content"
            required
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="อธิบายงาน วิธีใช้ หรือเงื่อนไขการนำไปใช้"
            className="field-input resize-y"
          />
        </div>

        <div>
          <label htmlFor="image" className="field-label">
            รูปตัวอย่าง
          </label>
          <label htmlFor="image" className="field-dropzone">
            {previewSrc ? (
              <>
                <Image
                  src={previewSrc}
                  alt="ตัวอย่างรูป"
                  width={180}
                  height={180}
                  className="rounded-lg object-contain max-h-44 w-auto"
                />
                <span className="field-hint" style={{ marginTop: 0 }}>
                  {imagePreview ? 'คลิกเพื่อเปลี่ยนรูป' : 'รูปปัจจุบัน — คลิกเพื่อเปลี่ยน'}
                </span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span className="text-sm font-medium">คลิกเพื่อเลือกรูป</span>
                <span className="field-hint" style={{ marginTop: 0 }}>
                  .jpg .jpeg .png .webp .svg — ระบบบีบขนาดให้อัตโนมัติ
                </span>
              </>
            )}
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept=".jpg,.jpeg,.webp,.svg,.png"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div>
          <label htmlFor="zipUrl" className="field-label">
            ลิงก์ดาวน์โหลดไฟล์
          </label>
          <input
            type="url"
            name="zipUrl"
            id="zipUrl"
            value={zipUrl}
            onChange={(e) => setZipUrl(e.target.value)}
            placeholder="https://.../file.zip"
            className="field-input"
          />
          {zipUrl ? (
            <p className="field-hint">
              ลิงก์ปัจจุบัน:{' '}
              <a href={zipUrl} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#f97316' }}>
                เปิดดู
              </a>
            </p>
          ) : (
            <p className="field-hint">วางลิงก์ไฟล์สำหรับดาวน์โหลด แทนการอัปโหลดไฟล์ ZIP เข้าระบบ</p>
          )}
        </div>

        {error && (
          <p className="text-sm font-medium" style={{ color: '#dc2626' }}>
            {error}
          </p>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/" className="btn-ghost">
            ยกเลิก
          </Link>
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? (
              <>
                <span className="btn-spinner" />
                กำลังบันทึก...
              </>
            ) : (
              'บันทึกการแก้ไข'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Edit
