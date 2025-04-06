export interface dropdownModel {
    id: number;
    value: string;
}

export interface ApiResponse {
    code?: number;
    message?: 'string';
    details?: any;
    data?: any;
    status?: any;
}

export const dateformat = {
    datetime: 'dd/MM/yyyy | h:mm a',
    titleFormat: 'EE dd MMM yyyy',
    date: 'd/M/yy',
    shortTime: 'hh:mma',
    DDMMYY: 'dd/MM/yyyy',
    AdeeTimeFormat: 'EEE MMM d yyyy',
};

export interface IDoctors {
    doctorPhoto?: string;
    degree?: string;
    registrationNumber?: string;
    clinicName?: string;
    clinicPhotos?: string[];
    yearsOfExperience?: any;
    speciality?: string;
    clinicContactNumber?: string;
    email?: string;
    address?: string;
    locationPin?: string;
    isApproved?: boolean;
    user?: any;
}
