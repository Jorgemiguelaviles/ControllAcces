<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class MoveFilesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $tmpName;
    protected $destinationPath;

    /**
     * Create a new job instance.
     *
     * @param string $tmpName
     * @param string $destinationPath
     * @return void
     */
    public function __construct($tmpName, $destinationPath)
    {
        $this->tmpName = $tmpName;
        $this->destinationPath = $destinationPath;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Verifica se o arquivo temporário existe
        if (file_exists($this->tmpName)) {
            // Move o arquivo temporário para o diretório de destino
            if (move_uploaded_file($this->tmpName, $this->destinationPath)) {
                // Arquivo movido com sucesso
                Log::info('Arquivo movido com sucesso para: ' . $this->destinationPath);
            } else {
                // Falha ao mover o arquivo
                Log::error('Falha ao mover o arquivo para: ' . $this->destinationPath);
            }
        } else {
            // Arquivo temporário não encontrado
            Log::error('Arquivo temporário não encontrado em: ' . $this->tmpName);
        }
    }
}
