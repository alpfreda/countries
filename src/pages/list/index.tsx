import React from 'react'
import { Alert } from '@mui/material'
import { useFetch } from './hook'
import Table from './list'

const Index = () => {
  const { data, loading, error } = useFetch()

  if (error) {
    return error && <Alert severity='error'>{error.message}</Alert>
  }

  return (
    <Table
      loading={loading}
      columns={['code', 'name']}
      data={data?.countries || []}
    />
  )
}

export default Index
