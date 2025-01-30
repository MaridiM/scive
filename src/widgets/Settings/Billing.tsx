import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Typography } from '@/shared/components'
import { cn } from '@/shared/utils'

export const Billing = () => {
    const table = [
        {
            id: 0,
            date: 'Apr.27.2023',
            type: 'Pro monthly',
            amount: '$20',
            receipt: '/url'
        },
        {
            id: 1,
            date: 'Apr.27.2023',
            type: 'Pro monthly',
            amount: '$5',
            receipt: '/url'
        },
        {
            id: 2,
            date: 'Apr.27.2023',
            type: 'Pro monthly',
            amount: '$5',
            receipt: '/url'
        },
        {
            id: 3,
            date: 'Apr.27.2023',
            type: 'Pro monthly',
            amount: '$20',
            receipt: '/url'
        },
        {
            id: 4,
            date: 'Apr.27.2023',
            type: 'Pro monthly',
            amount: '$5',
            receipt: '/url'
        },
        {
            id: 5,
            date: 'Apr.27.2023',
            type: 'Pro monthly',
            amount: '$5',
            receipt: '/url'
        },
        {
            id: 6,
            date: 'Apr.27.2023',
            type: 'Pro monthly',
            amount: '$20',
            receipt: '/url'
        },
        {
            id: 7,
            date: 'Apr.27.2023',
            type: 'Pro monthly',
            amount: '$5',
            receipt: '/url'
        },
        {
            id: 8,
            date: 'Apr.27.2023',
            type: 'Pro monthly',
            amount: '$5',
            receipt: '/url'
        },
        {
            id: 9,
            date: 'Apr.27.2023',
            type: 'Pro monthly',
            amount: '$20',
            receipt: '/url'
        }
    ]
    return (
        <div className='px-[8px] pt-base-x5' style={{ gap: 16 }}>
            <Typography variant='h4' className='mb-[20px] ml-base-x4 flex font-semibold text-gray-400'>
                Order history
            </Typography>
            <div className='flex h-[51px] w-[648px] items-center rounded-t-2xl bg-gray-200' style={{ gap: 16 }}>
                <Typography variant='body' className='w-[200px] text-center text-gray-900'>
                    Date
                </Typography>
                <Typography variant='body' className='w-[129px] text-center text-gray-900'>
                    Type
                </Typography>
                <Typography variant='body' className='w-[129px] text-center text-gray-900'>
                    Amount
                </Typography>
                <Typography variant='body' className='w-[142px] text-center text-gray-900'>
                    Receipt
                </Typography>
            </div>
            <div className='max-h-[408px] w-[648px] overflow-y-auto'>
                <Table className={cn('pr-1 text-center')}>
                    <TableBody className='max-h-[40px] bg-gray-50'>
                        {table.map(row => (
                            <TableRow key={row.id} className='border-none text-base-body'>
                                <TableCell className='font-bold text-gray-900'>{row.date}</TableCell>
                                <TableCell className='text-gray-900'>{row.type}</TableCell>
                                <TableCell className='text-gray-900'>{row.amount}</TableCell>
                                <TableCell className='font-semibold text-sky-400 hover:text-sky-500'>
                                    Download
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-baseline mt-5'>
                <Typography variant='h4' className='mr-[16px] flex px-2 text-base-body font-semibold text-gray-400'>
                    Payment method
                </Typography>
                <Button variant={'clear'} className='flex text-base-body text-sky-400'>
                    <Typography variant='h4' className='hover:text-black'>
                        + Add new
                    </Typography>
                </Button>
            </div>
        </div>
    )
}
