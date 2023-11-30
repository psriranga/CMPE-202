import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../env";
import axios from "axios";

const Analytics = () => {
  const [analytics, setAnalytics] = useState<any>();
  const getAnalytics = () => {
    axios
      .get(BASE_URL + "analytics/occupancy")
      .then((res) => {
        console.log(res.data);
        setAnalytics(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  return (
    <div>
      <div>
        <div className="mb-3">Location Wise analysis</div>
        <div>
          <div className="mb-2">Past 30 days</div>
          <div>
            {analytics?.locations_30_days &&
              Object.entries(analytics?.locations_30_days!).map(
                ([key, value]: any) => (
                  <div className="w-[95%] border-l-[4px] border-l-[#6BE9FA] border-solid border-[#e0e0e0] border-[1px] p-3 rounded-md bg-white mb-2">
                    {key}:{value}
                  </div>
                )
              )}
          </div>
        </div>
        <div>
          <div className="mb-2">Past 60 days</div>
          <div>
            {analytics?.locations_60_days &&
              Object.entries(analytics?.locations_60_days!).map(
                ([key, value]: any) => (
                  <div className="w-[95%] border-l-[4px] border-l-[#6BE9FA] border-solid border-[#e0e0e0] border-[1px] p-3 rounded-md bg-white mb-2">
                    {key}:{value}
                  </div>
                )
              )}
          </div>
        </div>
        <div>
          <div className="mb-2">Past 90 days</div>
          <div>
            {analytics?.locations_90_days &&
              Object.entries(analytics?.locations_90_days!).map(
                ([key, value]: any) => (
                  <div className="w-[95%] border-l-[4px] border-l-[#6BE9FA] border-solid border-[#e0e0e0] border-[1px] p-3 rounded-md bg-white mb-2">
                    {key}:{value}
                  </div>
                )
              )}
          </div>
        </div>
      </div>
      <div>
        <div className="mb-3">Movie Wise analysis</div>
        <div>
          <div className="mb-2">Past 30 days</div>
          <div>
            {analytics?.movies_30_days &&
              Object.entries(analytics?.movies_30_days!).map(
                ([key, value]: any) => (
                  <div className="w-[95%] border-l-[4px] border-l-[#6BE9FA] border-solid border-[#e0e0e0] border-[1px] p-3 rounded-md bg-white mb-2">
                    {value?.name}:{value?.occupancy}
                  </div>
                )
              )}
          </div>
        </div>
        <div>
          <div className="mb-2">Past 60 days</div>
          <div>
            {analytics?.movies_60_days &&
              Object.entries(analytics?.movies_60_days!).map(
                ([key, value]: any) => (
                  <div className="w-[95%] border-l-[4px] border-l-[#6BE9FA] border-solid border-[#e0e0e0] border-[1px] p-3 rounded-md bg-white mb-2">
                    {value?.name}:{value?.occupancy}
                  </div>
                )
              )}
          </div>
        </div>
        <div>
          <div className="mb-2">Past 90 days</div>
          <div>
            {analytics?.movies_90_days &&
              Object.entries(analytics?.movies_90_days!).map(
                ([key, value]: any) => (
                  <div className="w-[95%] border-l-[4px] border-l-[#6BE9FA] border-solid border-[#e0e0e0] border-[1px] p-3 rounded-md bg-white mb-2">
                    {value?.name}:{value?.occupancy}
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
