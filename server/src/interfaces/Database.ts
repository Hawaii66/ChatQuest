export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Comments: {
        Row: {
          created_at: string;
          id: number;
          quest: number;
          text: string;
          user: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          quest: number;
          text: string;
          user: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          quest?: number;
          text?: string;
          user?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Comments_quest_fkey";
            columns: ["quest"];
            isOneToOne: false;
            referencedRelation: "Quests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Comments_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "Users";
            referencedColumns: ["id"];
          }
        ];
      };
      Interactions: {
        Row: {
          created_at: string;
          id: number;
          quest: number;
          type: number;
          user: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          quest: number;
          type: number;
          user: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          quest?: number;
          type?: number;
          user?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Interactions_quest_fkey";
            columns: ["quest"];
            isOneToOne: false;
            referencedRelation: "Quests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Interactions_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "Users";
            referencedColumns: ["id"];
          }
        ];
      };
      Questions: {
        Row: {
          created_at: string;
          day: number;
          id: number;
          text: string;
        };
        Insert: {
          created_at?: string;
          day: number;
          id?: number;
          text: string;
        };
        Update: {
          created_at?: string;
          day?: number;
          id?: number;
          text?: string;
        };
        Relationships: [];
      };
      Quests: {
        Row: {
          comment: string;
          created_at: string;
          id: number;
          question: number;
          url: string;
          user: number;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: number;
          question: number;
          url: string;
          user: number;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: number;
          question?: number;
          url?: string;
          user?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Quests_question_fkey";
            columns: ["question"];
            isOneToOne: false;
            referencedRelation: "Questions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Quests_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "Users";
            referencedColumns: ["id"];
          }
        ];
      };
      Users: {
        Row: {
          clerk_id: string;
          created_at: string;
          email: string;
          id: number;
          username: string;
        };
        Insert: {
          clerk_id: string;
          created_at?: string;
          email: string;
          id?: number;
          username: string;
        };
        Update: {
          clerk_id?: string;
          created_at?: string;
          email?: string;
          id?: number;
          username?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
