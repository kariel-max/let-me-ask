import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { createRoomRequest } from "./types/create-room-request";
import type { createRoomsResponse } from "./types/create-room-response";

export function useCreateRoom() {
    const queryCleint = useQueryClient()
    return useMutation({
        mutationFn: async (data: createRoomRequest) => {
            const response = await fetch('http://localhost:3333/room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })

            const result: createRoomsResponse = await response.json()

            return result
        },
        onSuccess: () => {
            queryCleint.invalidateQueries({ queryKey: ['get-rooms']})
        }
    })
}