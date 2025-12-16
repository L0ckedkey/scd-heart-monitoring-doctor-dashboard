export const getClassificationColor = (classification: number) => {
    switch (classification) {
        case 0:
            return "bg-green-100 text-green-800"
        case 1:
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export const getAdditionalInfoColor = (info: number) => {

    switch (info) {
        case 1:
            return "bg-green-100 text-green-800"
        case 2:
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export const getCholesterolColor = (status: String) => {
    switch (status) {
        case "Normal":
            return "bg-green-100 text-green-800"
        case "Low":
            return "bg-yellow-100 text-yellow-800"
        case "High":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}