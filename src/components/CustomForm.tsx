/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { SelectCompanyPositions } from './SelectCompanyPosition';
import { SelectCompanyRelation } from './SelectCompanyRelation';

export const CustomForm = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} name="control-hooks" layout='vertical'>
      <Form.Item name="company-position" label="Company Position" rules={[{ required: true }]}>
        {/* @ts-ignore */}
        <SelectCompanyPositions error={form.getFieldError('company-position')} />
      </Form.Item>
      <Form.Item name="company-relation" label="Company Relation" rules={[{ required: true }]}>
        {/* @ts-ignore */}
        <SelectCompanyRelation error={form.getFieldError('company-relation')} />
      </Form.Item>
      <Form.Item name="text-input" label="Text Input" rules={[{ required: true, min: 5, max: 10 }]}>
        <Input />
      </Form.Item>
      <Form.Item name="text-area" label="Text Area" rules={[{ required: true, min: 5, max: 10 }]}>
        <TextArea />
      </Form.Item>
    </Form>
  )
};