import { create } from 'zustand'

type DeleteDialogState = {
    isOpen: boolean
    title: string
    message: string
    onConfirm: (() => Promise<void>) | null // Async delete function
    openDialog: (
        onConfirm: () => Promise<void>,
        title?: string,
        message?: string
    ) => void
    closeDialog: () => void
    reset: () => void
}

const initialState = {
    isOpen: false,
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this item?',
    onConfirm: null,
}

export const useDeleteDialogStore = create<DeleteDialogState>((set) => ({
    ...initialState,

    openDialog: (
        onConfirm,
        title = initialState.title,
        message = initialState.message
    ) => {
        set({
            isOpen: true,
            onConfirm,
            title,
            message,
        })
    },

    closeDialog: () => set({ isOpen: false }),

    reset: () => set(initialState),
}))
