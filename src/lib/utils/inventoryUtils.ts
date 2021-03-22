// TODO @wangannie replace with robust id generation
export const generateOfflineInventoryId = (): string => {
    return (Math.floor(Math.random() * 1000)).toString();
}