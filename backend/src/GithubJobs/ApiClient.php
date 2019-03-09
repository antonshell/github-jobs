<?php

namespace src\GithubJobs;

/**
 * Class ApiClient
 * @package src\GithubJobs
 */
class ApiClient
{
    private $baseUrl = 'https://jobs.github.com';

    /**
     * @param $params
     * @return mixed
     */
    public function search($params)
    {
        $baseUrl = $this->baseUrl . '/positions.json';
        $url = http_build_query($params);
        $url = $baseUrl . '?' . $url;
        $data = $this->sendGetRequest($url);
        return $data;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function get($id)
    {
        $url = $this->baseUrl . '/positions/' . $id . '.json';
        $data = $this->sendGetRequest($url);
        return $data;
    }

    /**
     * @param $url
     * @param array $headers
     * @return mixed
     */
    private function sendGetRequest($url,$headers = [])
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        if(count($headers)){
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }

        $result = curl_exec($ch);
        $result = json_decode($result,true);
        return $result;
    }
}