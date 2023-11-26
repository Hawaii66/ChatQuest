export type Conductor =
  | {
      text: string;
      type: "arrived";
      sent?: {
        uri: string;
        text: string;
      };
      response?: string;
    }
  | {
      expected: {
        hour: string;
        minute: string;
      };
      type: "waiting";
    };
