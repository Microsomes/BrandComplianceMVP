<?php

namespace App\Jobs;

use App\Models\Combination;
use App\Models\Phone;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;

class PopulateScrapesFromS3 implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //YYYY-MM-DD"
        $date = date('Y-m-d');

        //carphonewarehouse_data-2024-12-29.json

        $fname = 'carphonewarehouse_data-' . $date . '.json';

        //get the file from s3
        $contents = Storage::disk('s3')->get($fname);

        //decode the json
        $data = json_decode($contents, true);

        for ($i = 0; $i < count($data); $i++) {
           
            $phoneName = $data[$i]['preData']['name'];
            $url = $data[$i]['preData']['url'];

            $phone = Phone::firstOrCreate([
                'name' => $phoneName,
                'url' => $url,
            ]);

            echo $phone->id;

            for ($j = 0; $j < count($data[$i]['combinations']); $j++) {

                $combi = $data[$i]['combinations'][$j];

                $color = $combi['color'];
                $storage = $combi['storage'];
                $phoneUrl = $combi['url'];


                $combination = Combination::firstOrCreate([
                    'url' => $phoneUrl,
                ],[
                    'phone_id' => $phone->id,
                    'color' => $color,
                    'storage' => $storage,
                ]);


                $plans = $combi['plans'];

                echo $phoneName . ' ' . $color . ' ' . $storage . ' ' . $phoneUrl . '\n';

                //truncate plans
                $combination->plans()->delete();

                foreach($plans as $plan) {

                   $monthly = $plan['monthly'];
                   $upfront = $plan['upfront'];
                   $network = $plan['network'];
                   $dataAllowance = $plan['data'];
                   $minutes = $plan['minutes'];
                   $texts = $plan['texts'];
                   $contractLength = $plan['duration'];

                   //truncate plans

                   $combination->plans()->create([
                    'monthly' => floatval(explode('£', $monthly)[1]),
                    'upfront' => floatval(explode('£', $upfront)[1]),
                    'network' => $network,
                    'data_allowance' => $dataAllowance,
                    'minutes' => $minutes,
                    'texts' => $texts,
                    'contract_length' => $contractLength,
                ]);


                   print_r([
                    'phoneName' => $phoneName,
                    'url' => $url,
                    'monthly' => $monthly,
                    'upfront' => $upfront,
                    'network' => $network,
                    'dataAllowance' => $dataAllowance,
                    'minutes' => $minutes,
                    'texts' => $texts,
                    'contractLength' => $contractLength,
                ]);

                }

                
            }

            echo $phoneName . ' ' . $url . '\n';

        }
     

        echo 1;
    }
}
