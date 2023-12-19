declare type GetFormEntriesOptions = {
    bannedFieldPartialNames?: string[];
    bannedTypes?: string[];
};
export declare const getFormEntries: (form: HTMLFormElement, { bannedFieldPartialNames, bannedTypes }: GetFormEntriesOptions) => any;
export {};
