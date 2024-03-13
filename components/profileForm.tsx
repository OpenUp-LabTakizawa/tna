'use client'

import {
  CheckIcon,
  EnvelopeIcon,
  IdentificationIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { ImageUploader } from './imageUploader'

type Profile = {
  name: string
  company: string
  employeeId: number
  phoneNumber: string
  mail: string
  image: FileList
}

export function ProfileForm() {
  const { register, handleSubmit, unregister } = useForm<Profile>()
  const onSubmit: SubmitHandler<Profile> = (data) => {
    alert(JSON.stringify(data, null, 2))
    // デモ版仮でlocalStorageに保存
    // ホントはAPI送信してDBに投げたい。
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(data))
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 [&>labe:input]:w-80"
    >
      <label className="input input-bordered flex items-center gap-2">
        <UserIcon className="h-4 w-4 opacity-70" />
        <span className="label-text after:ml-0.5 after:text-red-500 after:content-['*']">
          氏名
        </span>
        <input
          type="text"
          className="grow"
          {...register('name', { required: true })}
          placeholder="オープン太郎"
          required={true}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text after:ml-0.5 after:text-red-500 after:content-['*']">
            所属会社
          </span>
        </div>
        <select
          className="select select-bordered w-full max-w-xs"
          {...register('company', { required: true })}
          defaultValue={''}
          required={true}
        >
          <option value={''} disabled>
            以下から１つ選択
          </option>
          <option value="株式会社オープンアップグループ">
            株式会社オープンアップグループ
          </option>
          <option value="株式会社ビーネックステクノロジーズ">
            株式会社ビーネックステクノロジーズ
          </option>
        </select>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <IdentificationIcon className="h-4 w-4 opacity-70" />
        <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
          社員番号
        </span>
        <input
          type="number"
          className="block w-80"
          placeholder="123456"
          {...register('employeeId', { required: true })}
          required={true}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <PhoneIcon className="h-4 w-4 opacity-70" />
        <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
          電話番号
        </span>
        <input
          type="tel"
          className="block w-80"
          placeholder="09012345678"
          {...register('phoneNumber', { required: true })}
          required={true}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <EnvelopeIcon className="h-4 w-4 opacity-70" />
        <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
          メールアドレス
        </span>
        <input
          type="email"
          className="block w-80"
          placeholder="example@mail.com"
          {...register('mail', { required: true })}
          required={true}
        />
      </label>
      <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
        個人情報提供への同意
      </span>
      <label className="label cursor-pointer">
        <span className="label-text">同意する</span>
        <input type="checkbox" className="checkbox" required={true} />
      </label>
      <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
        障がい者手帳の画像・写真
      </span>
      <ImageUploader<Profile>
        register={register}
        unregister={unregister}
        inputType="image"
      />
      <button className="btn btn-warning" type="submit">
        <CheckIcon className="h-6 w-6" />
        確認画面へ
      </button>
    </form>
  )
}
