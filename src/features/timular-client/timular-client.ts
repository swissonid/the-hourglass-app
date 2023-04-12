import { TimeEntry, timeEntrySchema } from "./timeular-types.internal";
import { z } from "zod";

const timeularBaseUrl = "https://api.timeular.com/api/v3";
const defaultHeaders = {
  "Content-Type": "application/json",
};

let accessToken: string | undefined = undefined;

export const Authentication = {
  /**
   * Sign in with API key and secret and return an access token
   * which should be used to access the API in the bearer header.
   *
   * @param apiKey
   * @param apiSecret
   */
  signInWithApiKeyAndSecret: async (
    apiKey: string | undefined = process.env.TIMEMULAR_API_KEY,
    apiSecret: string | undefined = process.env.TIMEMULAR_API_SECRET
  ): Promise<string> => {
    if (!apiKey || !apiSecret) {
      throw new Error(
        "API key and secret are required, have you set them in .env.local?"
      );
    }
    let requestOptions: RequestInit = {
      method: "POST",
      headers: {
        ...defaultHeaders,
      },
      body: JSON.stringify({
        apiKey,
        apiSecret,
      }),
      redirect: "follow",
    };
    const response = await fetch(
      `${timeularBaseUrl}/developer/sign-in`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const json = await response.json();
    return json.token;
  },
};
async function getAccessToken(): Promise<string> {
  if (!accessToken) {
    accessToken = await Authentication.signInWithApiKeyAndSecret();
  }
  return accessToken;
}

const timeEntriesResponseSchema = z.object({
  timeEntries: z.array(timeEntrySchema),
});

export const TimeTracking = {
  Reports: {
    allDataAsJson: getAllDataAsJson,
  },
};

async function getAllDataAsJson(
  from: Date,
  to: Date = new Date()
): Promise<TimeEntry[]> {
  const token = await getAccessToken();
  const authenticatedHeaders = {
    ...defaultHeaders,
    Authorization: `Bearer ${token}`,
  };
  from.toString();
  let fromString = from.toISOString();
  let toString = to.toISOString();
  fromString = fromString.replace("Z", "");
  toString = toString.replace("Z", "");
  const requestUrl = `${timeularBaseUrl}/report/data/${fromString}/${toString}`;
  let response = await fetch(requestUrl, {
    method: "GET",
    headers: authenticatedHeaders,
    redirect: "follow",
  });
  if (!response.ok) {
    throw new Error(`${requestUrl} ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  const timeEntriesResponse = timeEntriesResponseSchema.parse(json);
  return timeEntriesResponse.timeEntries;
}
